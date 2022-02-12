import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

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
        
        this.onAuthChange(this.auth.isSignedIn.get());
        // adding event lister
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  onSignOut=()=>{
    <button onClick={this.onSignOutClick} className="ui inverted primary button">
      <i className="google icon" style={{color:'blue'}} />      
        Sign Out  
    </button>
  }


  renderAuthButton(){
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      //console.log(this.auth.currentUser.get().getBasicProfile().tf);
      // console.log(this.auth.currentUser.get().getBasicProfile().zv);
      const user=this.auth.currentUser.get().getBasicProfile().tf;
      return (
        <div className="ui compact menu">
          <div className="ui simple dropdown item">
            {user}
            <i className="dropdown icon"></i>
            <div className="menu">
                <button onClick={this.onSignOutClick} className="ui inverted primary button" style={{marginLeft:'8px'}}>
                  <i className="google icon" style={{color:'blue'}} />      
                    Sign Out  
                </button>
            </div>
          </div>
        </div>

      );
    }
    else
    {
      return (
        <button onClick={this.onSignInClick} className="ui inverted primary button">
          <i className="google icon" style={{color:'blue'}}/>
          Sign In with Google
        </button>
      )
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }

}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);