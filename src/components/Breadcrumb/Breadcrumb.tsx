import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import capitalize from "lodash/capitalize";

function BreadcrumbSection() {
  const { owner, repo, issueNumber } = useParams();

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      {repo && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={`/issues/${owner}/${repo}`}>
            {capitalize(repo)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      {issueNumber && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="#">
            Issue
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
}

export default BreadcrumbSection;
