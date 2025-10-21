import { useState } from "react";
import { Button, Text } from "@mantine/core";

function Counter(){
    const [count, setcount] = useState(0);

    return (
        <div>
            <Text>Count: {count}</Text>
            <Button onClick={() => setcount(count + 1)} mt="sm">
                Tambah
            </Button>
        </div>
    );
}

export default Counter;