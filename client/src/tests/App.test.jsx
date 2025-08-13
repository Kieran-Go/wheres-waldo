import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App, { DataContext } from '../components/App';
import { vi } from 'vitest';

// Replace the real useFetchData with a mock function
vi.mock('../hooks/useFetchData', () => ({
  default: vi.fn(), // mock default export with a mock function
}));

// Mock window.scrollTo for tests because jsdom doesn't implement it
window.scrollTo = vi.fn();

import useFetchData from '../hooks/useFetchData'; // import the mocked function

describe('App component', () => {
  afterEach(() => {
    // Reset all mocks after each test so next test starts fresh
    vi.clearAllMocks();
  });

  // TEST: loading state and Loading component rendering
  it('renders loading state initially', () => {
    useFetchData.mockReturnValue({ data: null, loading: true, error: null });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/*" element={<App />}>
            {/* Outlet child */}
            <Route path="" element={<div>Child Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading scene data.../i)).toBeInTheDocument();
  });

  // TEST: error state and error throw
  it('throws an error on fetch failure', () => {
    const error = new Error('Failed to fetch');
    useFetchData.mockReturnValue({ data: null, loading: false, error });

    // Expect error to throw
    expect(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/*" element={<App />}>
              <Route path="" element={<div>Child Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
    }).toThrow('Failed to fetch');
  });

  // TEST: rendering of fetched data
  it('renders outlet children with scenes data in context', () => {
    const mockScenes = [{ id: 1, name: 'Mock Scene' }];

    useFetchData.mockReturnValue({ data: mockScenes, loading: false, error: null });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/*" element={<App />}>
            <Route
              path=""
              element={
                <DataContext.Consumer>
                  {({ scenes }) => <div>{scenes[0].name}</div>}
                </DataContext.Consumer>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Mock Scene')).toBeInTheDocument();
  });
});
