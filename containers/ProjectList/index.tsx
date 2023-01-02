import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProjectListTable from './components/ProjectListTable';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import useFetchApi from '../../hooks/useFetchApi';
import { iProjectListResponse } from "./types"


const ProjectList = () => {
    const [value, setValue] = useState("");
    const [projects, setProjects] = useState<iProjectListResponse[] | null>(null);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    const { data, isLoading } = useFetchApi("https://1d804441-d2e0-4eab-acf8-007edc817473.mock.pstmn.io/projects")

    const groupedByCategory = () => {
        if (value === "") {
            setProjects(data)
        }else{
            const filtered = data.filter((el: iProjectListResponse) => 
            value === "mangrove"? el.category === "mangrove" : el.category === "forestry")
            setProjects(filtered)
        }
    }

    useEffect(() => {
        groupedByCategory()
    },[value, data])

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <Box sx={{ width: '100%' }}>
        <h1>Fairatmos Projects</h1>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="All Project" value="" />
              <Tab label="Mangrove" value="mangrove" />
              <Tab label="Forestry" value="forestry" />
            </Tabs>
          </Box>
          <ProjectListTable data={projects} />
        </Box>
      );
}

export default ProjectList;