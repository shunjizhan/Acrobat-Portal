import React, { Component } from 'react';
import DropDown from '../DropDown/DropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AdvancedSearchBar.css';


class AdvancedSearchBar extends Component {
    state = {
        allRelationQueries: [{
            queries: ['', '', '', ''],
            relations: ['BEFORE', 'optional', 'optional']
        }]
    }

    handleTyping = index => e => {
        const query = e.target.value;
        const { allRelationQueries } = { ...this.state };
        const { queries } = allRelationQueries[0];
        queries[index] = query;
        
        // this.props.handleTyping(queries);
        this.setState({ allRelationQueries });
    }

    handleSearch = () => {
        const { allRelationQueries } = { ...this.state };
        this.props.handleSearch(allRelationQueries);
    }

    handleModeSwitch = () => {
        this.props.handleModeSwitch();
    }

    handleSelect = index => key => {
        const { allRelationQueries } = { ...this.state };
        const { relations } = allRelationQueries[0];
        relations[index] = key;
        
        // this.props.handleTyping(queries);
        this.setState({ allRelationQueries });
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.handleSearch();
        }
    }


    render() {
        const { relations } = this.state.allRelationQueries[0];
        const allRelations = ['BEFORE', 'AFTER', 'OVERLAP', 'MODIFY', 'IDENTICAL', 'SUBPROCEDURE'];
        return (
        <div id='search-section'>
            <div id='advanced-search-bar'>
                <input 
                    ref="AdvancedSearchBar_1"
                    type="text" 
                    className="searchText" 
                    placeholder="Relation 1" 
                    onChange={ this.handleTyping(0) }
                    onKeyDown={ this.handleKeyDown }
                />
                <div className='drop-down-container'>
                    <DropDown 
                        handleSelect={ this.handleSelect(0) }
                        dropDownData={ allRelations }
                        current={ relations[0] }
                    />
                </div>

                <input 
                    ref="AdvancedSearchBar_2"
                    type="text" 
                    className="searchText" 
                    placeholder="Relation 2" 
                    onChange={ this.handleTyping(1) }
                    onKeyDown={ this.handleKeyDown }
                />
                <div className='drop-down-container'>
                    <DropDown 
                        handleSelect={ this.handleSelect(1) }
                        dropDownData={ allRelations }
                        current={ relations[1] }
                    />
                </div>

                <input 
                    ref="AdvancedSearchBar_3"
                    type="text" 
                    className="searchText" 
                    placeholder="Relation 3" 
                    onChange={ this.handleTyping(2) }
                    onKeyDown={ this.handleKeyDown }
                />
                <div className='drop-down-container'>
                    <DropDown 
                        handleSelect={ this.handleSelect(2) }
                        dropDownData={ allRelations }
                        current={ relations[2] }
                    />
                </div>

                <input 
                    ref="AdvancedSearchBar_4"
                    type="text" 
                    className="searchText" 
                    id="searchText_4" 
                    placeholder="Relation 4" 
                    onChange={ this.handleTyping(3) }
                    onKeyDown={ this.handleKeyDown }
                />
                <button 
                    type="submit" 
                    id="searchButton"
                    onClick={ this.handleSearch }
                >
                    <FontAwesomeIcon icon={['fas', 'search']} />
                </button>
            </div>

            <button 
                type="submit" 
                id="basic-search-button"
                onClick={ this.handleModeSwitch }
            >
                Basic
            </button>
        </div>);
    }
}

export default AdvancedSearchBar;