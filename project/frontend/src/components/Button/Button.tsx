import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  color: 'white',
  '&:active': {
    backgroundColor: 'lightgreen',
  },
  '&:focus': {
    outline: 'none',
  },
});

const MyButton = ({ label, onClick, isSelected }: ButtonProps): JSX.Element => (
  <StyledButton onClick={onClick} style={{ outline: isSelected ? '1px lightgreen solid' : 'none' }}>
    {label}
  </StyledButton>
);

export default MyButton;
