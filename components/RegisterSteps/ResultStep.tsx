import React, { useContext } from 'react';
import Form from '../Form';
import Button from '../Button';
import { RegisterContext } from '../../pages/register';
import Preview from '../Form/Preview';

const ResultStep = () => {
  const { onBackStep, registerHandler, userData } = useContext(RegisterContext);

  return (
    <Form
      title="👮‍♂ Подтверждение регистрации"
      onSubmit={registerHandler}
    >
      <Preview {...userData} />
      <Button
        color="green"
        type="submit"
        around
        full
      >
        Подтвердить
      </Button>
      <Button
        color="blue"
        customStyles={{ marginTop: '10px' }}
        onClick={onBackStep}
        around
        outline
        full
      >
        Назад
      </Button>
    </Form>
  );
};

export default ResultStep;
