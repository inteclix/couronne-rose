import styled from "styled-components"

const Button = styled.div`
position: relative;
display: flex;
align-items: center;
font-size: 14px;
background: ${props => props.disabled ? "linear-gradient(90deg,gray 22%,gray 100%)" : "linear-gradient(90deg,#f5818e 22%,#680d1c 100%)"};
margin-left: 10px;
padding-left: 10px;
padding-right: 10px;
padding-top: 10px;
padding-bottom: 10px;
min-width: 100px;
color: white;
font-weight: 700;
border-radius: 16px;
height: 16px;
box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
.imgButton {
  display: ${(props) => (props.selected ? "block" : "none")};
  position: absolute;
  left: -5px;
  bottom: -5px;
  width: 16px;
}
:hover {

background: ${props => props.disabled ? "linear-gradient(90deg,gray 22%,gray 100%)" : "linear-gradient(90deg,#f5818e 10%,#680d1c 90%)"};
cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
}
`;

export default Button