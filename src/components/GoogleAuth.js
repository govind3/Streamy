import React, { Component } from 'react';

class GoogleAuth extends Component {
  state={isSignedIn:null};

  componentDidMount(){
    // wired up the GAPI library
    window.gapi.load('client:auth2',()=>{  // arrow finction is s second argument for callback
      // initialized the authentication client with our clientID
      window.gapi.client.init({
        clientId:'707205558890-7nbcmge3vkjtqutvme0taj3dqapi765a.apps.googleusercontent.com',
        scope:'profile email'
      }).then(()=>{   // is going to be automatically inovked after a library has successfully initialize itself.
        // only executed once our entire API library is ready to go.
        this.auth=window.gapi.auth2.getAuthInstance();// getting a reference to that object or get the user's current authentication status
        this.setState({isSignedIn: this.auth.isSignedIn.get() });
        // adding event lister
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange=()=>{
    this.setState({isSignedIn: this.auth.isSignedIn.get() });
  }

  renderAuthButton(){
    if(this.state.isSignedIn===null)
    {
      return null;
    }
    else if(this.state.isSignedIn)
    {
      return (
        <button onClick={this.auth.signOut} className="ui inverted primary button">
          <i className="google icon" />      
          Sign Out  
        </button>
      );
    }
    else{
      return (
        <button onClick={this.auth.signIn} className="ui inverted primary button">
          <i className="google icon" />
          Sign In with Google
        </button>
      )
    }
  }
  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  }
}

export default GoogleAuth;
