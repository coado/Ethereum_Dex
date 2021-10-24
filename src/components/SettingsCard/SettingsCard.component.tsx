import React from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-backdrop-filter: blur(0.3rem);
    backdrop-filter: blur(0.3rem);
    z-index: 1000;
    position: fixed;
    top: 1rem;
`

const Card = styled.div`
  width: 30rem;
  height: 15rem;
  position: fixed;
  background-color: #1b1426;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  position: relative;
  border: 1px solid #00e0c4;
  transition: all 0.2s;

  .wrapperColumn {
      display: flex;
      flex-direction: column;
  }

  .wrapperRow {
      display: flex;
  }
`

const Text = styled.h1`
    font-size: 1rem;
    color: #12eba7;
`


export const SettingsCard: React.FunctionComponent = () => (
    <Container>
        <Card>
            <div className='wrapperColumn'>
                <Text>Slippage Tolerance</Text>
                <div className='wrapperRow'>
                    
                </div>    
            </div>  

            <div className='wrapperColumn'>
                <Text>Deadline</Text>
            </div>  
        </Card>
    </Container>
)
