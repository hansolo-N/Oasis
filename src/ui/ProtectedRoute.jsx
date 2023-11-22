import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageSpinner = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  //1.loaded authenticated user
  const { isLoading, isAuthenticated } = useUser();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //2 show spinner while loading user
  if (isLoading)
    return (
      <PageSpinner>
        <Spinner />
      </PageSpinner>
    );
  //3 if there is no authenticated user redirect to login page

  //if there is a user render the app

  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;
