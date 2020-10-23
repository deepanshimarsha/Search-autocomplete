import React from "react";
import countries from './Countries';
import './App.css';


export default class AutoCompletedText extends React.Component{
    constructor(){
        super()
        this.state = {
            suggestions:[],
            text:''
            
        }

    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0 ){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = countries.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions ,
            text: value
    
        }))
    
    }

    selectedText(value){
        this.setState(()=> ({
            text:value,
            suggestions:[],
        }))
    }

    renderSuggestions = () => {
        let {suggestions} = this.state;
        if(suggestions.length === 0 ){
            return null;

        }
        return(
            <ul>
                {
                    suggestions.map((item,index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
                }
            </ul>
        );

    }
    render(){
        const {text,suggestions} = this.state;
        return(
            <div id = "notebooks">
                <h2>Country Name</h2>
                <input id="query" type="text" onChange={this.onTextChange}  value={text} />
                {this.renderSuggestions()}
                <span>Suggestions: {suggestions.length}</span>
            </div>
        );
    }

}