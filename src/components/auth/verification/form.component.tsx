import React, {useEffect} from 'react';
import {Input} from '../../../common/ui';
import {VerificationInterface} from '../../../interface';

const FormComponent = ({
  values,
  errors,
  touched,
  maxLength,
  handleChange,
}: VerificationInterface) => {
  return (
    <>
      <Input
        placeholder="Phone no"
        onChangeText={handleChange('phone')}
        autoCapitalize="none"
        keyboardType="numeric"
        value={values.phone}
        error={errors.phone}
        touched={touched}
        maxLength={maxLength}
      />
    </>
  );
};

export {FormComponent};
