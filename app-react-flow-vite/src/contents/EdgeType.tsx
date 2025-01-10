import { useState, useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
    Stack,
    Box,
    Typography,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    TextField,
    Checkbox,
} from '@mui/material';
import { Unstable_NumberInput as NumberInput } from '@mui/base';


import "./Top.css";


const initialNodes = [
    { id: 'parent', position: { x: 100, y: 100 }, data: { label: 'parent' } },
    { id: 'child1', position: { x:  50, y: 250 }, data: { label: 'child 1' } },
    { id: 'child2', position: { x: 300, y: 160 }, data: { label: 'child 2' } },
    { id: 'child3', position: { x: 250, y: 300 }, data: { label: 'child 3' } },
];
const initialEdges = [
    { id: 'p-c1', source: 'parent', target: 'child1', },
    { id: 'p-c2', source: 'parent', target: 'child2', },
    { id: 'p-c3', source: 'parent', target: 'child3', },
];


export const EdgeType: React.FC = () => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [edgeType, setEdgeType] = useState("default");
    const [edgeText, setEdgeText] = useState("");
    const [animated, setAnimated] = useState(false);
    const [isArrow, setIsArrow] = useState(false);
    const [edgeStrokeWidth, setEdgeStrokeWidth] = useState(1);
    const [edgeColor, setEdgeColor] = useState("#b1b1b7");
    
    

    // onConnect
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    // コントロール
    // Edge Typeを変更
    function handleEdgeType(e: React.ChangeEvent<HTMLInputElement>) {
        const newType: string = e.target.value;
        console.log(newType);

        setEdges((edges) => edges.map((e) => ({...e, type: newType})));
        setEdgeType(newType);
    }
    // Edge Textを変更
    function handleEdgeText(e: React.ChangeEvent<HTMLInputElement>) {
        const newText: string = e.target.value;
        console.log(newText);

        setEdges((edges) => edges.map((e) => ({...e, label: newText})));
        setEdgeText(newText);
    }
    // Animatedを変更
    function handleAnimated(e: React.ChangeEvent<HTMLInputElement>) {
        const newChecked: boolean | undefined = e.target.checked;
        console.log(newChecked);

        setEdges((edges) => edges.map((e) => ({...e, animated: newChecked})));
        setAnimated(newChecked);
    }
    // Is arrow を変更
    function handleIsArrow(e: React.ChangeEvent<HTMLInputElement>) {
        const newChecked: boolean | undefined = e.target.checked;
        console.log(newChecked);

        setEdges((edges) => edges.map((e: any) => ({
            ...e,
            markerEnd: newChecked? {
                type: MarkerType.ArrowClosed,
                color: e.style?.stroke? e.style.stroke: "#b1b1b7",
            }: {},
        })));
        setIsArrow(newChecked);
    }
    // Edge Stroke Widthを変更
    function handleEdgeStrokeWidth(e: React.ChangeEvent<HTMLInputElement>) {
        let newWidth: number = Number(e.target.value);
        console.log(newWidth);
        if (newWidth < 1) {
            newWidth = 1;
        }

        setEdges((edges) => edges.map((e: any) => ({...e, style: {...(e.style), strokeWidth: newWidth}})));
        setEdgeStrokeWidth(newWidth);
    }
    // Edge color を変更
    function handleEdgeColor(e: React.ChangeEvent<HTMLInputElement>) {
        const newColor = e.target.value;
        console.log(newColor);

        setEdges((edges) => edges.map((e: any) => ({
            ...e,
            style: {...(e.style), stroke: newColor},
            markerEnd: e.markerEnd? {
                ...(e.markerEnd), color: newColor
            }: {},
        })));
        setEdgeColor(newColor);
    }

    return (
        <Stack>
            <Box style={{ width: '100%', height: '50vh', backgroundColor: "#fff" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                >
                    <Controls />
                    <MiniMap />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </Box>
            <Box>
                <Typography
                    variant='h6'
                >
                    線の種類
                </Typography>
                <FormControl>
                    <FormLabel id="edge-type">Edge Type</FormLabel>
                    <RadioGroup
                        row
                        area-labelledby="edge-type"
                        name="edge-type-group"
                        value={edgeType}
                        onChange={handleEdgeType}
                    >
                        <FormControlLabel value="default"      control={<Radio />} label="default" />
                        <FormControlLabel value="straight"     control={<Radio />} label="straight" />
                        <FormControlLabel value="step"         control={<Radio />} label="step" />
                        <FormControlLabel value="smoothstep"   control={<Radio />} label="smoothstep" />
                        <FormControlLabel value="simplebesier" control={<Radio />} label="simplebesier" />
                    </RadioGroup>
                    <TextField
                        id="edge-text"
                        label="Edge Text"
                        variant="outlined"
                        sx={{ width: "200px"}}
                        onChange={handleEdgeText}
                        value={edgeText}
                    />
                    <FormControlLabel control={<Checkbox checked={animated} onChange={handleAnimated} />} label="Animated" />
                    <FormControlLabel control={<Checkbox checked={isArrow} onChange={handleIsArrow} />} label="Marker end is Arrow" />
                    <TextField
                        type="number"
                        value={edgeStrokeWidth}
                        onChange={handleEdgeStrokeWidth}
                        label="Edge Width"
                        sx={{ width: "200px"}}
                    />
                    <TextField
                        type="color"
                        value={edgeColor}
                        onChange={handleEdgeColor}
                        label="Edge Color"
                        sx={{
                            width: 100,
                            height: 50,
                            padding: 0,
                        }}
                    />
                </FormControl>
            </Box>
        </Stack>
    );
}
