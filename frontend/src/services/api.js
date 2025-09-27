const API_BASE_URL = 'http://localhost:3000';

class ApiService {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: { 'Content-Type': 'application/json' },
            ...options
        };
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(errorBody.message || `HTTP error! Status ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição', error);
            throw error;
        }
    }

    async getLivros(page = 1, limit = 10) {
        return this.request(`/livros?page=${page}&limit=${limit}`, { credentials: 'include' });
    }
    async createLivro(livro) {
        return this.request('/livros', {
            method: 'POST',
            body: JSON.stringify(livro),
            credentials: 'include'
        });
    }

    async getEmprestimos() {
        return this.request('/emprestimos', { credentials: 'include' });
    }
    async createEmprestimo(emprestimo) {
        return this.request('/emprestimos', {
            method: 'POST',
            body: JSON.stringify(emprestimo),
            credentials: 'include'
        });
    }

    async getUsuarios(nome = '') {
        const query = nome ? `?nome=${encodeURIComponent(nome)}` : '';
        return this.request(`/usuarios${query}`, { credentials: 'include' });
    }

    async login(email, password) {
        return this.request('/auth', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
    }
    async logout() {
        return this.request('/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
    }
    async checkAuth() {
        return this.request('/auth/me', {
            credentials: 'include'
        });
    }
}

export default new ApiService();