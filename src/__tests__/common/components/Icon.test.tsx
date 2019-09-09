import { mount, shallow } from 'enzyme';
import React from 'react';
import Icon from '../../../modules/common/components/Icon';

describe('Icon component', () => {
  const defaultProps = {
    icon: 'upload-1',
    size: 30,
    isActive: false
  };

  test('renders successfully', () => {
    shallow(<Icon {...defaultProps} />);
  });
});