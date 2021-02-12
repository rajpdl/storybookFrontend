import React, { Component } from 'react';
import AdminNavigation from '../../component/AdminNavigation';
import Loading from '../../component/Loading';
import { USER } from './../../config/UrlConfig';
import User from './../../component/User';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            users: []
        }
    }
    async componentDidMount() {
        const result = await fetch(`${USER}/`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        });
        if (result.status === 200) {
          const data = await result.json();
          this.setState({ users: data }, () => {
            this.setState({ loading: false });
          });
        }
        if(result.status === 401) {
            this.props.history.push('/login');
        }
        if(result.status === 403) {
            this.setState({msg: "You are not a superuser.You can't login."}, () => {
                this.setState({loading: false})
            });
        }
        if (result.status === 500) {
          this.setState({ msg: "Internal Server error occurred." });
        }
      }
    

    render() {
        if(this.state.loading) {
            return <Loading />
        }
        return(
            
                this.state.msg? 
                    <div className="message">
                        <p>{this.state.msg}</p>
                    </div>
                :  <div className="container">                
                <AdminNavigation />
                <button className="create primary" onClick={() => {
                    this.props.history.push('/admin/create');
                }}>Create New User</button>
                <div className="row">
                    {this.state.users.map((user, i) => {
                        return <User key={i} 
                        id={user._id}
                        role={user.role}
                        username={user.username} email={user.email} />
                    })}
                </div>
            </div>
            
                
        );  
    }
}

export default withRouter(Home);