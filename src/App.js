import React, {Component} from 'react';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';


const app = new Clarifai.App({
  apiKey: '681ac5b575d0420ba331b3355e17787e'
 });


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route:'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        enteries: '',
        created_at: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      enteries: data.enteries,
      created_at: data.created_at
    } })
  }

  //fetch users from API endpoint
  /** componentDidMount(){
        fetch('http://localhost:3000')
          .then(res => res.json())
          .then(console.log)
      } **/

  calculateFaceLocation = (data) => {
    const responseData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageFace');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: responseData.left_col * width,
      top: responseData.top_row * height,
      right: width - ( responseData.right_col * width),
      bottom: height - (responseData.bottom_row * height)
    }
  }

  displayBoundingBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response) => this.displayBoundingBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {this.state.route === 'home' 
          ? <div>
              <Logo/>
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
            </div>
          : (
              this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}
export default App;
