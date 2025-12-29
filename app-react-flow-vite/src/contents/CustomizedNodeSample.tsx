import { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
    Stack,
    Box,
} from '@mui/material';


import "./Top.css";
import "./CustomizedNode.css";

export const TextUpdaterNode: React.FC = (props: any) => {
    const onChange = useCallback((evt: any) => {
        console.log(evt.target.value);
        props.data.value = evt.target.value;
    }, []);

    // propsには、nodesで定義したすべての項目が渡ってくる
    console.log(props);

    return (
        <div className="text-updater-node">
            <label>input: </label>
            <input type="text" onChange={onChange} value={props.data.value} />
        </div>
    );
}
const nodeTypes = {
    textUpdater: TextUpdaterNode,
};


const nodes = [
    {
        id: 'node-1',
        type: 'textUpdater',
        position: { x: 100, y: 100 },
        data: { value: 123 },
    },
];

export const CustomizedNodeSample: React.FC = () => {
    return (
        <Stack>
            <Box style={{ width: '100%', height: '50vh', backgroundColor: "#fff" }}>
                <ReactFlow
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                >
                    
                    <Controls />
                    <MiniMap />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </Box>
        </Stack>
    )
};

