import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddCompetitor from './AddCompetitor';
import * as api from '../api';

vi.mock('../api', () => ({
  addCompetitor: vi.fn(),
}));

describe('AddCompetitor Component', () => {
  it('renders input fields and submit button', () => {
    render(<AddCompetitor refresh={() => {}} />);
    
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('URL (e.g. https://example.com)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Competitor/i })).toBeInTheDocument();
  });

  it('submits form with valid input', async () => {
    const mockRefresh = vi.fn();
    api.addCompetitor.mockResolvedValueOnce({});
    
    render(<AddCompetitor refresh={mockRefresh} />);
    
    const nameInput = screen.getByPlaceholderText('Name');
    const urlInput = screen.getByPlaceholderText('URL (e.g. https://example.com)');
    const submitButton = screen.getByRole('button', { name: /Add Competitor/i });
    
    fireEvent.change(nameInput, { target: { value: 'Test Competitor' } });
    fireEvent.change(urlInput, { target: { value: 'https://test.com' } });
    fireEvent.click(submitButton);
    
    expect(api.addCompetitor).toHaveBeenCalledWith({
      name: 'Test Competitor',
      url: 'https://test.com'
    });
    
    // Check if input is cleared asynchronously after submit
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(nameInput.value).toBe('');
    expect(urlInput.value).toBe('');
    expect(mockRefresh).toHaveBeenCalled();
  });

  it('prevents submission if inputs are empty', async () => {
    const mockRefresh = vi.fn();
    render(<AddCompetitor refresh={mockRefresh} />);
    
    const submitButton = screen.getByRole('button', { name: /Add Competitor/i });
    fireEvent.click(submitButton);
    
    expect(api.addCompetitor).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });
});
