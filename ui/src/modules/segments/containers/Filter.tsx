import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { router } from 'modules/common/utils';
import React from 'react';
import Filter from '../components/Filter';
import { queries } from '../graphql';
import { Counts, SegmentsQueryResponse } from '../types';

type Props = {
  contentType: string;
  counts: Counts;
  history?: any;
};

const FilterContainer = (props: Props) => {
  const { history, contentType } = props;

  const {
    loading: segmentsQueryLoading,
    error: segmentsQueryError,
    data: segmentsQueryData
  } = useQuery<SegmentsQueryResponse, { contentType: string }>(
    gql(queries.segments),
    {
      variables: { contentType },
      fetchPolicy: 'network-only'
    }
  );

  if (segmentsQueryError) {
    return <p>Error!</p>;
  }

  if (segmentsQueryLoading) {
    return null;
  }

  const currentSegment = router.getParam(history, 'segment');

  const setSegment = segment => {
    router.setParams(history, { segment });
  };

  const removeSegment = () => {
    router.removeParams(history, 'segment');
  };

  const extendedProps = {
    ...props,
    currentSegment,
    setSegment,
    removeSegment,
    segments: segmentsQueryData ? segmentsQueryData.segments : [],
    loading: segmentsQueryLoading
  };

  return <Filter {...extendedProps} />;
};

export default FilterContainer;