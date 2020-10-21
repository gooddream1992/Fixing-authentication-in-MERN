import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "./utils";
import "assets/css/drag-drop.css";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const columnNames = ["Lorem", "Ipsum", "Consectetur", "Eiusmod"];

const cardColors = [
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "burlywood",
  "cornsilk",
  "gainsboro",
  "ghostwhite",
  "ivory",
  "khaki"
];
const pickColor = () => {
  let rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

class Cards extends Component {
  constructor() {
    super();

    this.onColumnDrop = this.onColumnDrop.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      scene1: {
        type: "container",
        props: {
          orientation: "horizontal"
        },
        children: generateItems(4, i => ({
          id: `column${i}`,
          type: "container",
          name: columnNames[i],
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          children: generateItems(6, j => ({
            type: "draggable",
            id: `${i}${j}`,
            props: {
              className: "card",
              style: { backgroundColor: pickColor() }
            },
            data: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
          }))
        }))
      },
      scene:{levelList: []},
      lectureList: []
    };
  }
  componentDidMount(){
      var level_list = [];
      for(var i = 0; i < this.props.courselist.level_number; i++){
        level_list[i] = {
            id: i+1,
            card: []
        }
      }
      for(i = 0; i < this.props.lecturelist.length; i++){
          level_list[this.props.lecturelist[i].level_number-1].card.push(this.props.lecturelist[i])
      }
      for(i = 0; i < level_list.length; i++){
        var points = [40, 100, 1, 5, 25, 10];
        points.sort(function(a, b){return a-b});
        level_list[i].card.sort(function(a, b){return a.order_number-b.order_number})
          console.log(level_list[i])

      }
    //   console.log(level_list)
      this.setState({scene: {levelList: level_list}})
      this.setState({lectureList: this.props.lecturelist})
  }
  render() {
    return (
      <div className="card-scene">
        <Container
          orientation="horizontal"
          onDrop={this.onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
        >
          {this.state.scene.levelList.map(column => {
            return (
              <Draggable key={column.id}>
                <div className="card-container">
                  <div className="card-column-header">
                    <span className="column-drag-handle">&#x2630;</span>
                    {"Level "+column.id}
                  </div>
                  <Container
                    // {...column.props}
                    groupName="col"
                    // onDragStart={e => console.log("drag started", e)}
                    // onDragEnd={e => console.log("drag end", e)}
                    onDrop={e => this.onCardDrop(column.id, e)}
                    getChildPayload={index =>
                      this.getCardPayload(column.id, index)
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    onDragEnter={() => {
                    //   console.log("drag enter:", column);
                    }}
                    onDragLeave={() => {
                    //   console.log("drag leave:", column);
                    }}
                    onDropReady={p => this.onDropReady(p)}
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >
                    {column.card.map(card => {
                      return (
                        <Draggable key={card._id}>
                          <div className="card">
                            <p>{card.title}</p>
                          </div>
                        </Draggable>
                      );
                    })}
                  </Container>
                </div>
              </Draggable>
            );
          })}
        </Container>
      </div>
    );
  }

  getCardPayload(columnId, index) {
    return this.state.scene.levelList.filter(p => p.id === columnId)[0].card[
      index
    ];
  }
  onDropReady(p) {
    // console.log('Drop ready: ', p);
    // for(var i =0; i < this.state.lectureList.length; i++){
    //     if(this.state.lectureList[i]._id === p.payload._id){
    //         this.state.lectureList[i]._id
    //     }
    // }
  }
  onColumnDrop(dropResult) {
    // const scene = Object.assign({}, this.state.scene);
    // scene.levelList = applyDrag(scene.levelList, dropResult);
    // this.setState({
    //   scene
    // });
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.scene);
      const column = scene.levelList.filter(p => p.id === columnId)[0];
      const columnIndex = scene.levelList.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.card = applyDrag(newColumn.card, dropResult);
      scene.levelList.splice(columnIndex, 1, newColumn);
        var lecture_list = [];
        for(var i = 0; i < scene.levelList.length; i++){
            for(var j = 0; j < scene.levelList[i].card.length; j++){
                scene.levelList[i].card[j].order_number = j;
                scene.levelList[i].card[j].level_number = i+1;
                lecture_list.push(scene.levelList[i].card[j]);
            }
        }
        localStorage.lecturelist = JSON.stringify(lecture_list);
      this.setState({
        scene
      });
    }
  }
}

export default Cards;