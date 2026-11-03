export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GitHubFetchResult {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  status: 'loading' | 'success' | 'rate_limited' | 'error' | 'idle';
  errorMessage?: string;
}

export async function fetchGitHubData(username: string): Promise<GitHubFetchResult> {
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (userRes.status === 403) {
      return {
        user: null,
        repos: [],
        status: 'rate_limited',
        errorMessage: 'Limite de requisições públicas da API do GitHub atingido temporariamente. Utilize o link direto para navegar no perfil.'
      };
    }

    if (!userRes.ok) {
      return {
        user: null,
        repos: [],
        status: 'error',
        errorMessage: `Não foi possível carregar dados da API (${userRes.status}). Acesse o perfil diretamente.`
      };
    }

    const userData: GitHubUser = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });

    let reposData: GitHubRepo[] = [];
    if (reposRes.ok) {
      reposData = await reposRes.json();
    }

    return {
      user: userData,
      repos: reposData,
      status: 'success'
    };
  } catch {
    return {
      user: null,
      repos: [],
      status: 'error',
      errorMessage: 'Ambiente offline ou restrição de conexão à API do GitHub. O perfil oficial está sempre acessível via link direto.'
    };
  }
}

