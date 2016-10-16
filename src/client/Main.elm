module Main exposing (..)

import Html exposing (Html, div, text)
import Html.App


-- MODEL


type alias Model =
    (String, Int)


init : ( Model, Cmd Msg )
init =
    ( ("Hello", 4 ), Cmd.none )



-- MESSAGES


type Msg
    = NoOp



-- VIEW


view : Model -> Html Msg
view model =
  let (hello, test) = model
  in
    div []
        []



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )



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