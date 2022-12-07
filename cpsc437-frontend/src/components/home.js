import React from "react";
import styled from 'styled-components';
import Navigation from "./navigation";

export const Page = styled.div`
    background-color: #FDEBD7;
    width: 100vw;
    height: 100vh;
`
export const PageContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const GroceryForm = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;
    width: 100%;
`

export const Field = styled.input`
    font-family: 'Klee One', cursive;
    background-color: #ffaa9f
    height: 20px;
    padding: 10px 15px 10px;
    margin-bottom: 10px;
    font-size: 16px;
    border-radius: 25px;
    border: none;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    &:focus {
        outline: none;
      }
`

export const Button = styled.input`
    border-radius: 25px;
    border: none;
    background-color: #CD403E;
    color: white;
    padding: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    width: fit-content;
    font-family: 'Klee One', cursive;
`

export const Notebook = styled.div`
    width: 35%;
    height: fit-content;
    padding-bottom: 7px;
    outline-left: 1px solid #ffaa9f;
    background-color: #F5F5F5;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
    margin-left: -100px;
`
export const GroceryList = styled.ul`
    padding: 0px;
    height: 100%;
    font-family: 'Klee One', cursive;
`

export const Grocery = styled.li`
    list-style: none;
    border-bottom: 1px #96ADE9 solid;
    text-indent: 20px;
    padding: 5px;
    user-select: none;
`

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {groceries: []}
    }

    handleList = async (e) => {
        console.log(this.state)
        console.log(e.target.items.value)
        const oldArray = this.state.groceries
        console.log(oldArray)
        await this.setState(prevState => ({groceries: [...prevState.groceries, e.target.items.value]}))
        console.log(this.state.groceries)
    }

    render() {
        return(
            <Page>
                <Navigation />
                <PageContent>
                    <GroceryForm>
                        <form onSubmit={this.handleList} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Field type="text" name="items"/>
                            <Button type="submit" value="Add Item(s)"/>
                        </form>
                        <Notebook>
                            <GroceryList>
                                <Grocery>eggs</Grocery>
                                <Grocery>bacon</Grocery>
                                <Grocery>cheese</Grocery>
                                <Grocery style={{color: '#F5F5F5'}}>filler</Grocery>
                            </GroceryList>
                        </Notebook>
                    </GroceryForm>
                    <Button type="submit" value="Shop!" style={{margin: "auto", marginTop: "35px"}}/>            
                </PageContent>
            </Page>
        )
    }
}

export default Home;