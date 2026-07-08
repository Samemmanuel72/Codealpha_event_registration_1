const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', fetchEvents);

function showSection(sectionId) {
    document.getElementById('events').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
}

async function fetchEvents() {
    const res = await fetch(`${API_URL}/events`);
    const events = await res.json();
    document.getElementById('events-container').innerHTML = events.map(evt => `
        <div class="glass-card p-6 flex flex-col justify-between h-full">
            <div>
                <h3 class="text-xl font-bold text-white mb-2">${evt.title}</h3>
                <p class="text-gray-400 text-sm mb-4">${evt.description}</p>
                <div class="text-xs text-cyan-300 bg-cyan-900/30 inline-block px-2 py-1 rounded mb-4">
                    📍 ${evt.location} | 🗓️ ${new Date(evt.date).toLocaleDateString()}
                </div>
            </div>
            <button onclick="openModal('${evt._id}', '${evt.title}', '${evt.description}')" class="mt-4 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black py-2 rounded transition font-semibold w-full">
                Initialize Registration
            </button>
        </div>
    `).join('');
}

function openModal(id, title, desc) {
    document.getElementById('event-id').value = id;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

async function submitRegistration(e) {
    e.preventDefault();
    const eventId = document.getElementById('event-id').value;
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;

    const res = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, eventId })
    });
    
    if (res.ok) {
        alert('Uplink successful! You are registered.');
        closeModal();
        document.getElementById('reg-form').reset();
    }
}

async function fetchMyRegistrations() {
    const email = document.getElementById('userEmail').value;
    if (!email) return alert('Enter email first.');

    const res = await fetch(`${API_URL}/registrations/${email}`);
    const regs = await res.json();
    const container = document.getElementById('my-registrations-container');
    
    if (regs.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400">No active uplinks found.</p>';
        return;
    }

    container.innerHTML = regs.map(reg => `
        <div class="glass-card p-5 flex justify-between items-center border-l-4 border-l-purple-500">
            <div>
                <h4 class="text-lg font-bold text-white">${reg.event.title}</h4>
                <p class="text-xs text-gray-400">Reg ID: ${reg._id}</p>
            </div>
            <button onclick="cancelRegistration('${reg._id}')" class="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded transition">
                Abort
            </button>
        </div>
    `).join('');
}

async function cancelRegistration(id) {
    if (!confirm('Abort this registration?')) return;
    await fetch(`${API_URL}/registrations/${id}`, { method: 'DELETE' });
    fetchMyRegistrations();
}