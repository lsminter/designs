import styled from "@emotion/styled";

export const Article = styled.article`
margin: 0 auto;
max-width: 80%
`

export const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const BlogTitle = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
`;

export const List = styled.ul`
  list-style: square;
`;

export const ListItem = styled.li`
  padding: 10px;
  text-transform: capitalize;
  margin: 40px 0;
  cursor: pointer;
  color: #252525;
`;

export const PostTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;