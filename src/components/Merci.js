import React from "react"
import styled from "styled-components"

const MerciStyled = styled.div`
  display: ${props => props.showMerci ? "block" : "none"};
  position: absolute;
  top: calc(50% - 160px);
  left: calc(50% - 130px);
  width: 260px;
  height: 280px;
  border: 2px dashed lightgray;
  z-index: 1000;
  padding: 5px;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
  padding-top: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  span{
    position: absolute;
    background-color:lightgray;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    right: 10px;
    top: 10px;
    color: black;
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    font-weight: 700;
    :hover{
      color: red;
    }
  }
`

export default ({ setShowMerci, showMerci }) => {
  return (
    <MerciStyled showMerci={showMerci}>
      <div>
        <span onClick={() => setShowMerci(false)}>X</span>
        Merci pour votre participation
      </div>
    </MerciStyled>
  )
}
