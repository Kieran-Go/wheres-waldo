import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Scene from '../components/Scene';
import { DataContext } from '../components/App';

// Mock useParams before importing the component
vi.mock('react-router-dom', async () => {
  // Get actual module to spread all other exports
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),  // Mock useParams to always return id '1'
  };
});

describe('Scene component', () => {
  const mockScene = {
    id: 1,
    name: 'Test Scene',
    imageUrl: 'test-scene.jpg',
    characters: [
      {
        id: 1,
        name: 'Waldo',
        imageUrl: 'waldo.jpg',
        xMin: 10,
        xMax: 50,
        yMin: 10,
        yMax: 50,
      },
      {
        id: 2,
        name: 'Wizard',
        imageUrl: 'wizard.jpg',
        xMin: 10,
        xMax: 50,
        yMin: 10,
        yMax: 50,
      },
    ],
  };

  // TEST: render Loading component if no scenes in context
  it('renders loading if no scenes in context', () => {
    render(
      <DataContext.Provider value={{ scenes: null }}>
        <MemoryRouter>
          <Scene />
        </MemoryRouter>
      </DataContext.Provider>
    );
    expect(screen.getByText(/Loading scene data.../i)).toBeInTheDocument();
  });

  // TEST: render Loading component if no scenes or scenes not found
  it('renders loading if scene is not found', () => {
    render(
      <DataContext.Provider value={{ scenes: [] }}>
        <MemoryRouter>
          <Scene />
        </MemoryRouter>
      </DataContext.Provider>
    );
    expect(screen.getByText(/Loading scene data.../i)).toBeInTheDocument();
  });

  // TEST: renders scene image and characters
  it('renders scene info and characters', () => {
    render(
      <DataContext.Provider value={{ scenes: [mockScene] }}>
        <MemoryRouter>
          <Scene />
        </MemoryRouter>
      </DataContext.Provider>
    );

    expect(screen.getByAltText(/scene: test scene/i)).toBeInTheDocument();

    // Characters rendered
    expect(screen.getByText('Waldo')).toBeInTheDocument();
    expect(screen.getByText('Wizard')).toBeInTheDocument();
  });

  // TEST: change document title on mount
  it('sets document title on mount', () => {
    render(
      <DataContext.Provider value={{ scenes: [mockScene] }}>
        <MemoryRouter>
          <Scene />
        </MemoryRouter>
      </DataContext.Provider>
    );
    expect(document.title).toBe('Test Scene - Where\'s Waldo?');
  });

  // TEST: show character menu and selecting a character
  it('shows character menu on image click and allows selecting a character', async () => {
    render(
      <DataContext.Provider value={{ scenes: [mockScene] }}>
        <MemoryRouter>
          <Scene />
        </MemoryRouter>
      </DataContext.Provider>
    );

    const image = screen.getByAltText(/scene: Test Scene/i);

    // Mock getBoundingClientRect for click coords calculations
    image.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
    });

    // Mock naturalWidth and naturalHeight
    Object.defineProperty(image, 'naturalWidth', { value: 100, writable: false });
    Object.defineProperty(image, 'naturalHeight', { value: 100, writable: false });

    // Simulate clicking at coordinate inside Waldo's box
    fireEvent.click(image, { clientX: 30, clientY: 30 });

    // Character menu should now appear
    await waitFor(() => {
      expect(screen.queryByTestId('character-menu')).toBeInTheDocument();
    });

    // Click on Waldo in menu (found)
    fireEvent.click(screen.getByTestId('Character Selection Waldo'));

    // Character menu should now hide
    await waitFor(() => {
      expect(screen.queryByTestId('character-menu')).not.toBeInTheDocument();
    });

    // Waldo's card should have "found" class now
    expect(screen.getByText('Waldo').parentElement).toHaveClass('scene__character-card found');
  });

  // TEST: game end state and ScoreForm rendering
  it('ends the game and renders the ScoreForm when all characters are found',  async () => {
    render(
      <DataContext.Provider value={{ scenes: [mockScene] }}>
        <MemoryRouter>
          <Scene />
        </MemoryRouter>
      </DataContext.Provider>
    );
    
    const image = screen.getByAltText(/scene: Test Scene/i);

    // Mock getBoundingClientRect for click coords calculations
    image.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
    });

    // Mock naturalWidth and naturalHeight
    Object.defineProperty(image, 'naturalWidth', { value: 100, writable: false });
    Object.defineProperty(image, 'naturalHeight', { value: 100, writable: false });

    // Simulate finding Waldo
    fireEvent.click(image, { clientX: 30, clientY: 30 });
    fireEvent.click(screen.getByTestId('Character Selection Waldo'));

    // Simulate finding Wizard
    fireEvent.click(image, { clientX: 30, clientY: 30 });
    fireEvent.click(screen.getByTestId('Character Selection Wizard'));

    // Check if the score form has rendered after all characters found
    await waitFor(() => {
        expect(screen.queryByText(/You found all characters!/i)).toBeInTheDocument();
    });
  });
});
