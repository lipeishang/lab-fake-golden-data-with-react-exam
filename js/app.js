const App = React.createClass({
    getInitialState: function () {
        return {
            isEditor: true,
            elements: []
        }
    },
    toggle: function () {
        this.setState({
            isEditor: !this.state.isEditor
        })
    },
    deleteElement: function (index) {
        const elements = this.state.elements;
        elements.splice(index, 1);
        this.setState({elements});
    },

    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    render: function () {
        const isEditor = this.state.isEditor;
        return <div>
            <ReactRouter.Link to={isEditor ? "/previewer" : "/"}>
                <button onClick={this.toggle}>{isEditor ? "Previewer" : "Editor"}</button>
            </ReactRouter.Link>
            {this.props.children && React.cloneElement(this.props.children, {
                elements: this.state.elements,
                onAdd: this.addElement,
                onDelete: this.deleteElement
            })}
        </div>;


    }

});

const Editor = React.createClass({
    render: function () {
        return <div>
            <Left elements={this.props.elements} onDelete={this.props.onDelete}/>
            <Right onAdd={this.props.onAdd}/>
        </div>
    }
});

const Left = React.createClass({
    delete: function (index) {
        this.props.onDelete(index);
    },
    render: function () {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index} id="left">
                <input type={ele}/>
                <button type="button" className="btn btn-small btn-primary" onClick={this.delete.bind(this, index)}>X
                </button>
            </div>

        })
        return <div>
            {elements}
        </div>
    }
});

const Right = React.createClass({
    add: function () {
        const element = $("input[name=element]:checked").val();
        this.props.onAdd(element);
    },
    render: function () {
        return <div>
            <div id="right">
                <p><input type="radio" name="element" value="textArea"/>Text</p>
                <p><input type="radio" name="element" value="date"/>Date</p>
                <p>
                    <button type="button" className="btn btn-info" onClick={this.add}>+</button>
                </p>
            </div>
        </div>
    }
});

const Previewer = React.createClass({
    render: function () {

        const elements = this.props.elements.map((ele, index) => {
            return <div key={index}>
                <input type={ele}/>
            </div>
        });

        return <div>
            <div id="pr">
                <center>
                    {elements}<br/>
                </center>
            </div>
            <center>
                <button type="button" className="btn btn-info">submit</button>
            </center>


        </div>
    }
});

ReactDOM.render(
    <ReactRouter.Router>
        <ReactRouter.Route path="/" component={App}>
            <ReactRouter.IndexRoute component={Editor}/>
            <ReactRouter.Route path="/previewer" component={Previewer}/>
        </ReactRouter.Route>
    </ReactRouter.Router>
    , document.getElementById('content'));
