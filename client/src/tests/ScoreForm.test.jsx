import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ScoreForm from '../components/ScoreForm';

// Create mockNavigate once here so it can be used in the mock implementation
const mockNavigate = vi.fn();

// Mock react-router-dom *once* at top level
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ScoreForm component', () => {
  const time = 65; // 1:05
  const sceneId = '1';

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock fetch globally
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    // Mock localStorage
    Storage.prototype.setItem = vi.fn();
  });

  // TEST: correctly render heading and formatted time
  it('renders heading and formatted time', () => {
    render(
      <MemoryRouter>
        <ScoreForm time={time} sceneId={sceneId} />
      </MemoryRouter>
    );
    expect(screen.getByText(/You found all characters!/i)).toBeInTheDocument();
    expect(screen.getByText('Your time:')).toBeInTheDocument();
    expect(screen.getByText('1:05')).toBeInTheDocument();
  });

  // TEST: update name field on user-input
  it('updates input value on change', () => {
    render(
      <MemoryRouter>
        <ScoreForm time={time} sceneId={sceneId} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/enter your name/i);
    fireEvent.change(input, { target: { value: 'TestName' } });
    expect(input.value).toBe('TestName');

    // Should trim input longer than 30 characters
    fireEvent.change(input, { target: { value: 'a'.repeat(50) } });
    expect(input.value.length).toBeLessThanOrEqual(30);
  });

  // TEST: submit form
  it('submits form and calls navigate on success', async () => {
    render(
      <MemoryRouter>
        <ScoreForm time={time} sceneId={sceneId} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/enter your name/i);
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'Player1' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/scores'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Player1', time, sceneId: parseInt(sceneId, 10) }),
        }),
      );

      expect(localStorage.setItem).toHaveBeenCalledWith('activeSceneId', sceneId);
      expect(mockNavigate).toHaveBeenCalledWith('/leaderboard');
    });
  });

  // TEST: alert on fetch failure
  it('alerts on fetch failure', async () => {
    global.fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
    window.alert = vi.fn();

    render(
      <MemoryRouter>
        <ScoreForm time={time} sceneId={sceneId} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/enter your name/i);
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'Player1' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('An error occurred submitting your score.');
    });
  });
});
