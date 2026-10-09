import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

interface SearchInputProps {
  fullWidth: boolean;
  size: 'small' | 'medium';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ fullWidth, size, placeholder, value, onChange }: SearchInputProps) => {
  // const [value, setValue] = useState('');

  return (
    <Stack
      direction="row"
      sx={{
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 1,
      }}
    >
      <TextField
        fullWidth={fullWidth}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit">
                <IconifyIcon icon="mingcute:search-line" color="text.secondary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="filled"
        size={size}
        sx={{
          '& .MuiFilledInput-root': {
            borderRadius: 2,
          },
          '&::placeholder': {
            color: 'text.secondary',
          },
          border: '1px solid',
          borderColor: 'primary.light',
          borderRadius: 2,
        }}
      />
    </Stack>
  );
};

export default SearchInput;
