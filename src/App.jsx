import { Container, Title, TextInput, Button } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

function App() {
  return (
    <Container size="sm" padding="md">
      <Title order={1}>Hello React + Mantine 🚀</Title>

      <TextInput
        label="Nama"
        placeholder="Masukkan nama kamu"
        icon={<IconUser size={18} />}
        mt="md"
      />

      <Button mt="md" color="blue">
        Submit
      </Button>
    </Container>
  );
}

export default App;
