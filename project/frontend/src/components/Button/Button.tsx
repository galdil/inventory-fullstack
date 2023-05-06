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

const MyButton = ({ label }: ButtonProps): JSX.Element => (
  <StyledButton>
    {label}
  </StyledButton>
);

export default MyButton;
