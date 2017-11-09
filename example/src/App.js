import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {
        id: 'someuniquevalue1',
        name: 'elot',
        age: 23
      }, {
        id: 'someuniquevalue2',
        name: 'dev',
        age: 2
      }, {
        id: 'someuniquevalue3',
        name: 'John Clicker-Stealerson',
        age: 59
      }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    //find the person object index via ID
    const personIndex = this
      .state
      .persons
      .findIndex(p => {
        return p.id === id;
      });

    //using spread operator to copy the object, dont want by reference!!
    const person = {
      ...this.state.persons[personIndex]
    };
    //updating name with new value from textbox
    person.name = event.target.value;
    //copying persons array, dont want reference!!
    const persons = [...this.state.persons];
    //Updating old object with new object
    persons[personIndex] = person;
    //updating state with copied array
    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    //copy old array with spread operator
    const persons = [...this.state.persons];
    //remove person
    persons.splice(personIndex, 1);
    //update state with copied array, with person removed.
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    //booleans will copy by value
    const doesShow = this.state.showPersons;

    //update state with opposite of what it was.
    this.setState({
      showPersons: !doesShow
    });
  }

  render() {
    //css object
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    //should we show the person lists? dependant on state then we will either render the persons or not.
    if (this.state.showPersons) {
      //map function to turn an array into html
      persons = (
        <div>
          {this
            .state
            .persons
            .map((person, index) => {
              return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
            })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App using lists state/props</h1>
        <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
