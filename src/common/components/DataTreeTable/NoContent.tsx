import { Center, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import React from 'react';

const NoContent = () => (
  <Row pa="md">
    <Center>
      <Typography>
        Нет данных для отображения
      </Typography>
    </Center>
  </Row>
)

export default NoContent;
