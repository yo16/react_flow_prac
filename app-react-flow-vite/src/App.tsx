import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import {
    AppBar, Toolbar, Typography, IconButton,
    Drawer, List, ListItemButton, ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import "./App.css";

// 各ページのコンポーネント
import { Top } from './contents/Top';
import { EdgeType } from './contents/EdgeType';
import { CustomizedNodeSample } from './contents/CustomizedNodeSample';


const drawerWidth = 240;



const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMenuOpen((prevState) => !prevState);
    };
    return (
        <Router>
            <AppBar
                component="nav"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h5'
                    >
                        React Flow Samples
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav>
                {/* 左ペインのDrawer */}
                <Drawer
                    variant="temporary"
                    open={menuOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <List
                        sx={{
                            backgroundColor: "#eee",
                        }}
                    >
                        <ListItemButton
                            component={Link}
                            onClick={handleDrawerToggle}
                            to="/"
                        >
                            <ListItemText primary="基本" />
                        </ListItemButton>
                        <ListItemButton
                            component={Link}
                            onClick={handleDrawerToggle}
                            to="/edge-type"
                        >
                            <ListItemText primary="線の種類" />
                        </ListItemButton>
                        <ListItemButton
                            component={Link}
                            onClick={handleDrawerToggle}
                            to="/customized-node-sample"
                        >
                            <ListItemText primary="カスタムノード" />
                        </ListItemButton>
                    </List>
                </Drawer>
            </nav>

            {/* メインコンテンツ */}
            <div style={{ display: 'flex' }}>
                <main style={{ flexGrow: 1, padding: '16px' }}>
                <Routes>
                    {/* ルーティング設定 */}
                    <Route path="/" element={<Top />} />
                    <Route path="/edge-type" element={<EdgeType />} />
                    <Route path="/customized-node-sample" element={<CustomizedNodeSample />} />
                </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
