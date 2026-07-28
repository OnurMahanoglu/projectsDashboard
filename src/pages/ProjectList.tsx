import { useEffect, useState } from 'react';
import type { Project } from '../types/project';
import { useSearch } from '../context/SearchContext';

export const ProjectList = () => {
  const { searchTerm } = useSearch();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <ul>
          {filteredProjects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};