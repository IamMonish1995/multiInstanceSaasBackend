export function extractOwnerAndRepoName(url) {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const matches = url.match(regex);
    if (matches && matches.length >= 3) {
        const ownerName = matches[1];
        const repoName = matches[2];
        return { ownerName, repoName };
    } else {
        return null; // URL format doesn't match GitHub repository URL
    }
}
