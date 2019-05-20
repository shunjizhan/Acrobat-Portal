import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropDown from "../DropDown/DropDown";
import './RelationSearch.css';


/*
    Component for multi relation search
    no UI polish since it is for inner test
                                                */
class relationSearch extends Component {
    state = {
        queries: ['', ''],
        relations: ['BEFORE']
    }

    handleTyping = index => e => {
        const query = e.target.value;
        const { queries } = { ...this.state };
        queries[index] = query;
        this.setState({ queries });
    }

    handleSearch = () => {
        console.log({ ...this.state });
    }

    handleSelect = index => key => {
        const { relations } = { ...this.state };
        relations[index] = key;
        this.setState({ relations });
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.handleSearch();
        }
    }

    handleAddColumn = () => {
        const { queries, relations } = { ...this.state };
        queries.push('');
        relations.push('BEFORE')
        this.setState({ queries, relations} );
        console.log('add column');
    }


    render() {
        const { queries, relations } = this.state;
        const allRelations = ['BEFORE', 'AFTER', 'OVERLAP', 'MODIFY', 'IDENTICAL', 'SUBPROCEDURE'];
        const inputComponent = queries.map((word, i) => {
            if (i === queries.length - 1) {
                return  (<div className='one_relation'>               
                    <input 
                        type="text" 
                        className="searchText" 
                        onChange={ this.handleTyping(i) }
                        onKeyDown={ this.handleKeyDown }
                    />
                </div>)
            } else {
                return  (<div className='one_relation'>               
                    <input 
                        type="text" 
                        className="searchText" 
                        onChange={ this.handleTyping(i) }
                        onKeyDown={ this.handleKeyDown }
                    />
                    <div className='drop-down-container'>
                        <DropDown 
                            handleSelect={ this.handleSelect(i) }
                            dropDownData={ allRelations }
                            current={ relations[i] }
                        />
                    </div>
                </div>)
            }
        })
        return (<div className='one_query'>
            { inputComponent }
            <div>
                <button 
                    type="submit" 
                    className="button"
                    onClick={ this.handleSearch }
                >
                    <FontAwesomeIcon icon={['fas', 'search']} />
                </button>
                <button 
                    className="button"
                    onClick={ this.handleAddColumn }
                >
                +
                </button>
            </div>
        </div>);
        // return (
        // <div id='relation_search'>
        //     <div className='one_relation'>


        //         <input 
        //             type="text" 
        //             className="searchText" 
        //             placeholder="Relation 2" 
        //             onChange={ this.handleTyping(1) }
        //             onKeyDown={ this.handleKeyDown }
        //         />
        //         <div className='drop-down-container'>
        //             <DropDown 
        //                 handleSelect={ this.handleSelect(1) }
        //                 dropDownData={ allRelations }
        //                 current={ relations[1] }
        //             />
        //         </div>

        //         <input 
        //             type="text" 
        //             className="searchText" 
        //             placeholder="Relation 3" 
        //             onChange={ this.handleTyping(2) }
        //             onKeyDown={ this.handleKeyDown }
        //         />
        //         <div className='drop-down-container'>
        //             <DropDown 
        //                 handleSelect={ this.handleSelect(2) }
        //                 dropDownData={ allRelations }
        //                 current={ relations[2] }
        //             />
        //         </div>

        //         <input 
        //             ref="AdvancedSearchBar_4"
        //             type="text" 
        //             className="searchText" 
        //             id="searchText_4" 
        //             placeholder="Relation 4" 
        //             onChange={ this.handleTyping(3) }
        //             onKeyDown={ this.handleKeyDown }
        //         />
        //     </div>


            // <button 
            //     className="button"  
            //     onClick={ this.handleSearch }
            // >
            // + row
            // </button>
        // </div>);
    }
}

export default relationSearch;