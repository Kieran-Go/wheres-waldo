import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Leaderboard from '../components/Leaderboard';
import { DataContext } from '../components/App';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

describe('Leaderboard', () => {
  const mockScenes = [
    { id: 1, name: 'Scene 1', imageUrl: 'url1' },
    { id: 2, name: 'Scene 2', imageUrl: 'url2' },
  ];

  beforeEach(() => {
    // Mock fetch globally
    global.fetch = vi.fn();

    // Mock localStorage
    Storage.prototype.getItem = vi.fn(() => null);
    Storage.prototype.setItem = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // TEST: show loading component when scenes are missing
  it('shows loading initially when scenes are missing', () => {
    render(
      <DataContext.Provider value={{ scenes: [{}] }}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </DataContext.Provider>
    );
    expect(screen.getByText(/Loading leaderboard.../i)).toBeInTheDocument();
  });

  // TEST: change document title on mount
  it('sets document title on mount', () => {
    render(
      <DataContext.Provider value={{ scenes: mockScenes }}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </DataContext.Provider>
    );
    expect(document.title).toBe("Leaderboard - Where's Waldo?");
  });

  // TEST: fetch and display active scene scores
  it('fetches and displays scores for active scene', async () => {
    const mockScores = [
      { id: 1, name: 'Alice', time: 123 },
      { id: 2, name: 'Bob', time: 150 },
    ];

    // Mock fetch response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockScores,
    });

    render(
      <DataContext.Provider value={{ scenes: mockScenes }}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </DataContext.Provider>
    );

    // Wait for scores to be rendered
    await waitFor(() => {
      expect(screen.getByText(/alice/i)).toBeInTheDocument();
      expect(screen.getByText(/bob/i)).toBeInTheDocument();
    });
  });

  // TEST: handle fetch failure
  it('handles fetch failure and shows alert', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    // Spy on window.alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <DataContext.Provider value={{ scenes: mockScenes }}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </DataContext.Provider>
    );

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Failed to fetch scores');
      expect(screen.getByText(/no scores yet/i)).toBeInTheDocument();
    });

    alertSpy.mockRestore();
  });

  // TEST: renders scene names and thumbnails
  it('Displays name and thumbnails of scenes'), async () => {
    render(
       <DataContext.Provider value={{ scenes: mockScenes }}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
       </DataContext.Provider>
    );

    await waitFor(() => {
        expect(screen.getByText(/Scene 1/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Thumbnail for Scene 2/i)).toBeInTheDocument();
    })
  }

  // TEST: update active scene and localStorage on scene click
  it('updates active scene and localStorage on scene click', async () => {
    const mockScores = [{ id: 1, name: 'Alice', time: 123 }];
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockScores,
    });

    render(
      <DataContext.Provider value={{ scenes: mockScenes }}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </DataContext.Provider>
    );

    // Wait for scenes to be rendered
    await waitFor(() => {
        expect(screen.getByText(/Scene 1/i)).toBeInTheDocument();
    })

    // Get the second scene and simulate the user clicking it
    const secondSceneCard = screen.getByText('Scene 2');
    fireEvent.click(secondSceneCard);

    // localStorage.setItem should be called with activeSceneId and id
    expect(localStorage.setItem).toHaveBeenCalledWith('activeSceneId', 2);

    // Wait for the score for the second scene to load (triggered by effect)
    await waitFor(() => {
      expect(screen.getByText(/alice/i)).toBeInTheDocument();
    });
  });
});
