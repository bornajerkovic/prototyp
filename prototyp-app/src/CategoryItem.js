import React, { Component } from 'react';
import { ProductConsumer } from './context';

class CategoryItem extends Component{
    render(){
        const category_name = this.props.categories;
        return(
            <ProductConsumer>
               {(value) => (<div className="container--category--button">
                    <button className="category--button" onClick={() => value.filterItems(category_name.name)}>
                        <p>{category_name.name}</p>
                    </button>
            </div>)}
            </ProductConsumer>
        )
    }
}
export default CategoryItem;