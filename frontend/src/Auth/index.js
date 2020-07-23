import React from "react";
import { useHistory } from "react-router-dom";
import { Card, ButtonGroup, Button, Container } from "react-bootstrap";
import Signup from "./Signup";
import Login from "./Login";
import "./Auth.scss";
import background from '../shared/images/background-home.jpg'


function Auth({ view }) {
  let history = useHistory();

  const toggleForm = (form) => {
    if (view === form) {
      return;
    }
    let route = form === "signup" ? "/signup" : "/login";
    history.push(route);
  };

  return (
    <div className="Home">
      <img src={background}
        alt="books lying open layered across floor" />
      <Container className="Auth mt-5">
        <Card className="col-md-8 offset-md-2">
          <Card.Body>
            <div className="text-right mb-3">
              <ButtonGroup>
                <Button
                  variant="outline-primary"
                  onClick={() => toggleForm("signup")}
                  active={view === "signup"}
                >
                  Sign Up
              </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => toggleForm("login")}
                  active={view === "login"}
                >
                  Log In
              </Button>
              </ButtonGroup>
            </div>
            {view === "signup" ? <Signup /> : <Login />}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Auth;
