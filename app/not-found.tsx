"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";

const NotFoundPage = () => {
  const [page, setPage] = useState("");

  useEffect(() => {
    setPage(window.location.pathname.slice(1));
  }, []);

  return (
    <Container className="h-[65vh] flex items-center justify-center">
      <div>
        <span className="capitalize font-semibold">{page}</span> page will not
        be contructed since its content would be dummy
      </div>
    </Container>
  );
};

export default NotFoundPage;
