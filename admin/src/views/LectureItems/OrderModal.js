import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from './utils';
import "assets/css/drag-drop.css";
class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.lectureitemlist.sort(function(a, b){return a.order_number-b.order_number})
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(e) {
      var list = applyDrag(this.state.items, e);
      for(var i = 0; i < list.length; i++){
          list[i].order_number = i;
      }
      localStorage.itemlist = JSON.stringify(list);
      this.setState({ items: applyDrag(this.state.items, e) })
  }
  getCardPayload(index) {
    //   console.log()
    return this.state.items[index];
  }
  render() {
    return (
      <div>
        <div className="simple-page">
            <Container 
                onDrop={e => this.onDrop(e)}
                getChildPayload={index =>
                  this.getCardPayload(index)
                }
            >
                {this.state.items.map(p => {
                return (
                    <Draggable key={p._id}>
                    <div className="draggable-item">
                        {p.title}
                    </div>
                    </Draggable>
                );
                })}
            </Container>
        </div>
      </div>
    );
  }
}
export default Simple;