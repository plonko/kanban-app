import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import connect from '../libs/connect';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes_state: [
                {
                    id: uuid.v4(),
                    task: 'Learn React'
                },
                {
                    id: uuid.v4(),
                    task: 'Do yolo'
                }
            ]
        };
        this.focus = this.focus.bind(this);
    }
    render() {
        const {notes_state} = this.state;

        return (
            <div>
                {this.props.test}
                <button className="add-note" onClick={this.addNote}>+</button>
                <Notes
                    notes={notes_state}
                    onNoteClick={this.activateNoteEdit}
                    onEdit={this.editNote}
                    onDelete={this.deleteNote}
                    />

                {/*
                <input
                    type="text"
                    ref={(input) => this.textInput = input}
                />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focus}
                />
                <input type="text" ref={element => element.focus()} />
                */}
            </div>
        )
    }
    focus() {
        // Explicitly focus the text input using the raw DOM API
        this.textInput.focus();
    }
    addNote = () => {
        // It would be possible to write this in an imperative style.
        // I.e., through `this.state.notes.push` and then
        // `this.setState({notes: this.state.notes})` to commit.
        //
        // I tend to favor functional style whenever that makes sense.
        // Even though it might take more code sometimes, I feel
        // the benefits (easy to reason about, no side effects)
        // more than make up for it.
        //
        // Libraries, such as Immutable.js, go a notch further.
        this.setState({
            notes_state: this.state.notes_state.concat([{
                id: uuid.v4(),
                task: 'New task'
            }])
        });
    }

    deleteNote = (id, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        this.setState({
            notes_state: this.state.notes_state.filter(note => note.id !== id)
        });
    }

    activateNoteEdit = (id) => {
        this.setState({
            notes_state: this.state.notes_state.map(note => {
                if(note.id === id) {
                    note.editing = true;
                }

                return note;
            })
        });
    }
    editNote = (id, task) => {
        this.setState({
            notes_state: this.state.notes_state.map(note => {
                if(note.id === id) {
                    note.editing = false;
                    note.task = task;
                }

                return note;
            })
        });
    }
}

export default connect(() => ({
    test: 'test'
}))(App)
