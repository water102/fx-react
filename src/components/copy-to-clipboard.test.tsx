import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { CopyToClipboardButton } from './copy-to-clipboard';
import toast from 'react-hot-toast';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    dismiss: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock navigator.clipboard
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe('CopyToClipboardButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockWriteText.mockResolvedValue(undefined);
  });

  test('Renders button with children', () => {
    render(
      <CopyToClipboardButton value="test">
        Copy Text
      </CopyToClipboardButton>
    );
    expect(screen.getByText('Copy Text')).toBeInTheDocument();
  });

  test('Copies text to clipboard on click', async () => {
    render(
      <CopyToClipboardButton value="test value">
        Copy
      </CopyToClipboardButton>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith('test value');
    });
  });

  test('Shows success toast when copy succeeds', async () => {
    render(
      <CopyToClipboardButton value="test">
        Copy
      </CopyToClipboardButton>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.dismiss).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Copied');
    });
  });

  test('Calls onCopy callback when provided', async () => {
    const onCopy = jest.fn();
    render(
      <CopyToClipboardButton value="test" onCopy={onCopy}>
        Copy
      </CopyToClipboardButton>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onCopy).toHaveBeenCalledWith('test');
    });
  });

  test('Shows error toast when copy fails', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard error'));
    render(
      <CopyToClipboardButton value="test">
        Copy
      </CopyToClipboardButton>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});

