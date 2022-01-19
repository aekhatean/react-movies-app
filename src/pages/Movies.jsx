import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { topMovies } from "../API/movies";
import { MovieCard, Paginator } from "../components";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

// Redux related
import { useSelector } from "react-redux";

export default function Movies() {
  let { pageNum } = useParams();
  const totalStarred = useSelector((state) => state.fav.starred);
  const [moviesInPage, setMoviesInPage] = useState([]);

  useEffect(() => {
    topMovies
      .get(`sort_by=original_title.desc&page=${pageNum}`)
      .then((res) => res.data.results)
      .then((movies) => setMoviesInPage(movies));
  }, [pageNum]);

  return (
    <main id="movies-page" className="mt-4">
      <Container>
        <h1>Movies catalogue</h1>
        <Row>
          {moviesInPage.map((movie) => (
            <Col md={3} sm={4} xs={6} key={movie.id}>
              <MovieCard
                title={movie.original_title}
                poster={movie.poster_path}
                vote={movie.vote_average}
                movieId={movie.id}
                starDeclared={
                  totalStarred.indexOf(movie.id) > -1 ? solidStar : null
                }
              />
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center">
          <Col md={12}>
            <Paginator page="movies" currIndex={pageNum} api={topMovies} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
