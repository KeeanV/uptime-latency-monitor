import React from 'react';
import { MantineProvider, Container, Title, Text, Button, Stack } from '@mantine/core';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="md" style={{ paddingTop: 80, textAlign: 'center' }}>
        <Stack spacing="lg">
          <Title order={1}>Effortlessly monitor website uptime and latency — open source and cloud-ready.</Title>
          <Button size="md" color="blue" radius="md">
            Get Started
          </Button>
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default App;
