import UserContext from "../Contexts/UserContext";
import { UserProvider } from "../Contexts/UserContext";
import StatesContext from "../Contexts/StatesContext";
import { StatesProvider } from "../Contexts/StatesContext";
import APIContext from "../Contexts/APIContext";
import { APIProvider } from "../Contexts/APIContext";

const contexts = {
  UserContext,
  UserProvider,
  StatesContext,
  StatesProvider,
  APIContext,
  APIProvider,
};

export default contexts;
