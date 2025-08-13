import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DataContext } from '../components/App';
import Home from '../components/Home';
import mockScenes from '../mockData';

describe('Home', () => {
    it('renders a scene from context', () => {
        render(
            <DataContext.Provider value={{ scenes: mockScenes }}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </DataContext.Provider>
        )

        // Scene name is in the document
        expect(screen.getByText('A Dream Come True')).toBeInTheDocument();

        // Thumbnail is in the document
        expect(screen.getByAltText('Thumbnail for A Dream Come True')).toBeInTheDocument();
    });
})