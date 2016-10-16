module Main exposing (..)

import Html exposing (Html, div, text, nav, header, ul, li, footer)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Html.App

import Models exposing (Model)


-- MODEL

initialModel: Model
initialModel =
  { user = "jacob"
  , password = "1234"
  
  }
init : ( Model, Cmd Msg )
init =
    ( initialModel, Cmd.none )



-- MESSAGES


type Msg
    = NoOp
    | Reset



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "app-wrapper" ] [
      header [] [
        nav [] [
          ul [] [
            li [] [ text "home" ]
          , li [] [ text "products" ]
          , li [] [ text "About us" ]
          , li [ onClick Reset ] [ text "Hmm" ]
          ]
        ]
      ]
    , div [ class "app-content" ] [
        text (model.user ++ model.password)
      ]
    , footer [] [
        nav [] [ text "footer links"]
      ]
    ]



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
          ( model, Cmd.none )
        Reset ->
          if model.password == "" then 
            ({ model | password = " new Password" }, Cmd.none)
          else 
            ( { model | password = "" }, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main : Program Never
main =
    Html.App.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }